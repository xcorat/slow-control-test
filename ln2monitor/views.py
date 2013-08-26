from pyramid.view import view_config
from .models import MyModel
from datetime import datetime, timedelta

from ln2methods import *

@view_config(context=MyModel, renderer='templates/mytemplate.pt')
def my_view(request):
    return {'project': 'LN2Monitor'}

@view_config(route_name='test-plots', renderer='templates/test-plots.jinja2')
def test_plots_view(request):
    return {'test': 'test'}

@view_config(route_name='test-jq', renderer='templates/ajaxtest.jinja2')
def test_jq_view(request):
    return {'test': 'test'}

@view_config(route_name='json-data', renderer='json')
def json_request(request):
    params = request.matchdict['params']
    if params == 'data1':
        data = {
                "cols": [
                        {"id":"","label":"Topping","pattern":"","type":"string"},
                        {"id":"","label":"Slices","pattern":"","type":"number"}
                    ],
                "rows": [
                        {"c":[{"v":"Mushrooms","f":None},{"v":3,"f":None}]},
                        {"c":[{"v":"Onions","f":None},{"v":1,"f":None}]},
                        {"c":[{"v":"Olives","f":None},{"v":1,"f":None}]},
                        {"c":[{"v":"Zucchini","f":None},{"v":1,"f":None}]},
                        {"c":[{"v":"Pepperoni","f":None},{"v":2,"f":None}]}
                    ]
                }
    elif params == 'data2':
        data = [
            ['Year', 'Sales', 'Expenses'],
            ['2004',  1000,      400],
            ['2005',  1170,      460],
            ['2006',  660,       1120],
            ['2007',  1030,      540]
        ]
        
    elif params == 'weight-temp':
        print request.GET
        now = datetime.utcnow()
        if 'start' in request.GET:
            data = get_table(request.collection, 
                             get_datetime(request.GET['start']),
                             get_datetime(request.GET['end']),
                             int(request.GET['numpoints']),
                             )
        else:
            data = get_table(request.collection)
        print "time elapsed: " + str(datetime.utcnow() - now)
    return data

