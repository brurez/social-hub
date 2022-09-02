
# An error class with attributes expected by the frontend
class ApiError(Exception):
    def __init__(self, message, status):
        if type(message) is str:
            self.message = message
        else:
            self.message = " ".join([str(key + ": " + value[0]) for key, value in message.items()])

        self.status = status

    def __str__(self):
        return self.message

    def __repr__(self):
        return self.message
