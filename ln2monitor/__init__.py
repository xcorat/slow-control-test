from pyramid.config import Configurator
from pyramid_zodbconn import get_connection
from .models import appmaker

from urlparse import urlparse
import pymongo

def root_factory(request):
    conn = get_connection(request)
    return appmaker(conn.root())


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(root_factory=root_factory, settings=settings)
    config.add_static_view('static', 'static', cache_max_age=3600)
    
    db_url = urlparse(settings['mongo_uri'])
    config.registry.db = pymongo.Connection(
        host=db_url.hostname,
        port=db_url.port,
    )

    def add_collection(request):
        db = config.registry.db[db_url.path[1:]]
        if db_url.username and db_url.password:
            db.authenticate(db_url.username, db_url.password)
        collection = db[settings['mongo_collection']]
        return collection
    
    config.add_request_method(add_collection, 'collection', reify=True)
    
    config.include('pyramid_jinja2')
    config.include(add_routes)
    
    config.scan()
    return config.make_wsgi_app()

def add_routes(config):
    config.add_route('test-plots', '/testplots')
    config.add_route('test-jq', '/testjq')
    config.add_route('json-data', '/json/{params}')