from django.db import models
from django.utils.text import slugify


class News(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    category = models.CharField(max_length=100)
    date = models.DateField()
    read_time = models.CharField(max_length=50)
    featured = models.BooleanField(default=False)
    image = models.URLField(blank=True, null=True)
    description = models.TextField()
    content = models.TextField()

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)
            slug, n = base, 2
            while News.objects.filter(slug=slug).exists():
                slug = f"{base}-{n}"
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title