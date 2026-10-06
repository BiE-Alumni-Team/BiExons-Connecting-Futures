from django.db import models
from django.utils.text import slugify


class Opportunity(models.Model):
    TYPE_CHOICES = [('Job', 'Job'), ('Internship', 'Internship')]
    WORK_MODE_CHOICES = [('On-site', 'On-site'), ('Hybrid', 'Hybrid'), ('Remote', 'Remote')]

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    organization = models.CharField(max_length=255)
    field = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    work_mode = models.CharField(max_length=20, choices=WORK_MODE_CHOICES)
    deadline = models.DateField()
    posted_date = models.DateField()
    contact_email = models.EmailField()
    description = models.TextField()
    content = models.TextField()
    requirements = models.JSONField(default=list, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)
            slug, n = base, 2
            while Opportunity.objects.filter(slug=slug).exists():
                slug = f"{base}-{n}"
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title