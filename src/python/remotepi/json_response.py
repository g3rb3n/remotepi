import json
from flask import Response
from functools import wraps
import datetime

date_handler = lambda obj: (
    obj.isoformat() + 'Z'
    if isinstance(obj, datetime.datetime)
    or isinstance(obj, datetime.date)
    else None
)

def json_response(f):
    @wraps(f)
    def wrapped_function(*args, **kwargs):
        res = f(*args, **kwargs)
        if isinstance(res, tuple) and isinstance(res[0], Response):
            return res
        if res and 'error' in res:
            return Response(json.dumps(res, default=date_handler), mimetype='application/json'), 500
        return Response(json.dumps(res, default=date_handler), mimetype='application/json')
    return wrapped_function
