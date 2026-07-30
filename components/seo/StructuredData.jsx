export default function StructuredData({ property }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'PrimeHub',
    description: 'Kenya\'s trusted real estate company. Find land and homes across Kenya.',
    url: 'https://primehub.co.ke',
    telephone: '+254 712 345 678',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Westlands',
      addressLocality: 'Nairobi',
      addressRegion: 'Nairobi',
      addressCountry: 'KE',
    },
    sameAs: [
      'https://www.facebook.com/primehub',
      'https://www.twitter.com/primehub_ke',
      'https://www.instagram.com/primehub',
    ],
  }

  if (property) {
    const propertySchema = {
      '@context': 'https://schema.org',
      '@type': property.category === 'plot' ? 'LandPlot' : 'SingleFamilyResidence',
      name: property.title,
      description: property.description,
      image: property.image,
      url: `https://primehub.co.ke/properties/${property.id}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: property.location.area,
        addressRegion: property.location.county,
        addressCountry: 'KE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: property.location.coordinates.lat,
        longitude: property.location.coordinates.lng,
      },
      offers: {
        '@type': 'Offer',
        price: property.price,
        priceCurrency: 'KES',
        availability: property.type === 'rent' ? 'https://schema.org/InStock' : 'https://schema.org/InStock',
      },
    }

    if (property.category === 'home') {
      propertySchema.numberOfRooms = property.specs.bedrooms
      propertySchema.numberOfBathrooms = property.specs.bathrooms
      propertySchema.floorSize = {
        '@type': 'QuantitativeValue',
        value: property.specs.size,
        unitCode: 'MTK',
      }
    }

    if (property.category === 'plot') {
      propertySchema.floorSize = {
        '@type': 'QuantitativeValue',
        value: property.specs.size * 100,
        unitCode: 'FTK',
      }
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
      />
    )
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}