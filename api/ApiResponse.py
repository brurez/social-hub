from django.http import JsonResponse


class ApiResponse(JsonResponse):
    def __init__(self, data=None, error_message=None, status=200, **kwargs):
        res = {'success': False, 'error': {'message': error_message}} if error_message else {'success': True, 'data': data}
        super().__init__(res, status=status, **kwargs)
