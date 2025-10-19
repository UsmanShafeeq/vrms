from django.db import models


class Vehicle(models.Model):
    VEHICLE_TYPE_CHOICES = [
        ('car', 'Car'),
        ('bike', 'Bike'),
        ('truck', 'Truck'),
        ('bus', 'Bus'),
        ('van', 'Van'),
        ('other', 'Other'),
    ]

    TRANSMISSION_CHOICES = [
        ('manual', 'Manual'),
        ('automatic', 'Automatic'),
        ('semi_automatic', 'Semi-Automatic'),
    ]

    VARIANT_CHOICES = [
        ('base', 'Base'),
        ('standard', 'Standard'),
        ('deluxe', 'Deluxe'),
        ('sport', 'Sport'),
        ('luxury', 'Luxury'),
        ('limited', 'Limited Edition'),
        ('premium', 'Premium'),
        ('custom', 'Custom'),
    ]

    brand_name = models.CharField(
        max_length=100,
        verbose_name="Brand Name",
        help_text="Enter the brand of the vehicle (e.g., Toyota, Honda)"
    )
    vehicle_name = models.CharField(
        max_length=100,
        verbose_name="Vehicle Name",
        help_text="Enter the vehicle model name (e.g., Corolla, Civic)"
    )
    model_number = models.CharField(
        max_length=50,
        verbose_name="Model Number",
        help_text="Enter the model or series number"
    )
    registration_number = models.CharField(
        max_length=50,
        unique=True,
        verbose_name="Registration Number",
        help_text="Unique registration number of the vehicle"
    )
    vehicle_type = models.CharField(
        max_length=20,
        choices=VEHICLE_TYPE_CHOICES,
        verbose_name="Vehicle Type"
    )
    vehicle_subtype = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name="Vehicle Subtype",
        help_text="Enter subtype such as Sedan, SUV, or Hatchback"
    )
    variant = models.CharField(
        max_length=30,
        choices=VARIANT_CHOICES,
        verbose_name="Variant",
        help_text="Select the variant or trim level of the vehicle"
    )
    transmission = models.CharField(
        max_length=20,
        choices=TRANSMISSION_CHOICES,
        verbose_name="Transmission Type"
    )
    chassis_number = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Chassis Number"
    )
    engine_number = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Engine Number"
    )
    description = models.TextField(
        blank=True,
        null=True,
        verbose_name="Description",
        help_text="Optional: provide details about the vehicle"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Vehicle"
        verbose_name_plural = "Vehicles"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.brand_name} {self.vehicle_name} ({self.registration_number})"
