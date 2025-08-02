# from django.db import models

# class Laptop(models.Model):
#     BRAND_CHOICES = [
#         ('Apple', 'Apple'),
#         ('Dell', 'Dell'),
#         ('HP', 'HP'),
#         ('Lenovo', 'Lenovo'),
#         ('Asus', 'Asus'),
#         ('Acer', 'Acer'),
#         ('MSI', 'MSI'),
#     ]
    
#     # laptop_id = models.IntegerField(unique=True)
#     id = models.AutoField(primary_key=True)
#     company = models.CharField(max_length=50, choices=BRAND_CHOICES)
#     product = models.CharField(max_length=100)
#     type_name = models.CharField(max_length=50)
#     inches = models.FloatField()
#     screen_resolution = models.CharField(max_length=100)
#     cpu = models.CharField(max_length=100)
#     ram = models.CharField(max_length=20)  # Stored as "8GB", "16GB" etc.
#     memory = models.CharField(max_length=100)  # Original storage string
#     gpu = models.CharField(max_length=100)
#     opsys = models.CharField(max_length=50)
#     weight = models.CharField(max_length=20)
#     price_euros = models.DecimalField(max_digits=10, decimal_places=2)
    
#     # Derived fields for prediction
#     ram_gb = models.IntegerField()  # Extracted from Ram field (8, 16, etc.)
#     storage_gb = models.IntegerField()  # Extracted from Memory field
    
#     class Meta:
#         ordering = ['company', 'product']
    
#     def __str__(self):
#         return f"{self.company} {self.product}"


from django.db import models

class Laptop(models.Model):
    BRAND_CHOICES = [
        ('Apple', 'Apple'),
        ('Dell', 'Dell'),
        ('HP', 'HP'),
        ('Lenovo', 'Lenovo'),
        ('Asus', 'Asus'),
        ('Acer', 'Acer'),
        ('MSI', 'MSI'),
    ]
    
    OS_CHOICES = [
        ('Windows', 'Windows'),
        ('MacOS', 'MacOS'),
        ('Linux', 'Linux'),
        ('ChromeOS', 'ChromeOS'),
    ]
    
    laptop_id = models.AutoField(primary_key=True)  # Changed from IntegerField
    company = models.CharField(max_length=50, choices=BRAND_CHOICES)
    product = models.CharField(max_length=100)
    type_name = models.CharField(max_length=50)
    inches = models.FloatField()
    screen_resolution = models.CharField(max_length=100)
    cpu = models.CharField(max_length=100)
    ram = models.CharField(max_length=20)
    memory = models.CharField(max_length=100)
    gpu = models.CharField(max_length=100)
    opsys = models.CharField(max_length=50, choices=OS_CHOICES,default='Windows')  # Added choices
    weight = models.CharField(max_length=20)
    price_euros = models.DecimalField(max_digits=10, decimal_places=2,null=True, blank=True)
    ram_gb = models.IntegerField()
    storage_gb = models.IntegerField()
    image_url = models.URLField(max_length=500, blank=True, null=True)  # Added for frontend
    
    # Add this for better string representation
    def __str__(self):
        return f"{self.company} {self.product} ({self.ram_gb}GB/{self.storage_gb}GB)"
    
    class Meta:
        ordering = ['company', 'product']
        verbose_name = "Laptop"
        verbose_name_plural = "Laptops"