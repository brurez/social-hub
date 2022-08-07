
class ApiError(Exception):
    def __init__(self, message, status):
        self.message = message
        self.status = status

    def __str__(self):
        return self.message

    def __repr__(self):
        return self.message
