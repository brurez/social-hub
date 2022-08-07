from django.http import JsonResponse


class ApiResponse(JsonResponse):
    def __init__(self, error_message=None, status=200, **kwargs):
        data = {'success': False, 'error': {'message': error_message}} if error_message else {'Success': True}
        super().__init__(data, status=status, **kwargs)
