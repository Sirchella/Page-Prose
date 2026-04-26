import cloudinary
import cloudinary.uploader
from django.core.files.storage import Storage


class CloudinaryMediaStorage(Storage):
    """Minimal Cloudinary storage compatible with Django 6."""

    def _save(self, name, content):
        result = cloudinary.uploader.upload(
            content,
            folder='book_covers',
            use_filename=True,
            unique_filename=True,
            overwrite=False,
            resource_type='image',
        )
        return result['public_id']

    def url(self, name):
        return cloudinary.CloudinaryImage(name).build_url()

    def exists(self, name):
        return False

    def delete(self, name):
        try:
            cloudinary.uploader.destroy(name)
        except Exception:
            pass

    def _open(self, name, mode='rb'):
        import urllib.request
        from django.core.files.base import ContentFile
        with urllib.request.urlopen(self.url(name)) as response:
            return ContentFile(response.read(), name=name)
