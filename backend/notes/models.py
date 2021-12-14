from django.db import models


class Note(models.Model):
    user = models.ForeignKey("authentication.User", on_delete=models.CASCADE)
    text = models.TextField(blank=True)
    label = models.CharField(max_length=100, blank=True)
    color = models.CharField(max_length=255, blank=True)
    background_color = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.label.__str__() + ": " + self.text.__str__()
