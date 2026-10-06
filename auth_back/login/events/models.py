from django.db import models
from django.utils.text import slugify


class Event(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    type = models.CharField(max_length=100)
    date = models.DateField()
    time = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    organizer = models.CharField(max_length=255)
    image = models.URLField(blank=True, null=True)
    description = models.TextField()
    content = models.TextField()
    registration_open = models.BooleanField(default=False)
    register_link = models.URLField(blank=True, null=True)
    registration_deadline = models.DateField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)
            slug, n = base, 2
            while Event.objects.filter(slug=slug).exists():
                slug = f"{base}-{n}"
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title