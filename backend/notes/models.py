from django.db import models


class Note(models.Model):
    user = models.ForeignKey("authentication.User", on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    color = models.CharField(max_length=255)
    label = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.label.__str__() + ": " + self.text.__str__()
