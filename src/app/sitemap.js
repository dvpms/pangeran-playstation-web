export default function sitemap() {
  const supportedAreas = [
    "bsd",
    "karawaci",
    "curug",
    "bitung",
    "citra-raya",
    "cikupa",
    "balaraja",
    "cisoka",
    "tangerang"
  ];

  const areaRoutes = supportedAreas.map((area) => ({
    url: `https://www.pangeranplaystation.my.id/area/${area}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [
    {
      url: 'https://www.pangeranplaystation.my.id',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.pangeranplaystation.my.id/booking',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...areaRoutes
  ]
}
