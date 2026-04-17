Berikut adalah ERD (Entity Relationship Diagram) dalam format tabel markdown berdasarkan schema Prisma kamu.  
Kamu bisa copy-paste tabel ini ke dokumentasi (misal, README atau docs/PROJECT_OVERVIEW.md).

---

### Entity Relationship Diagram (ERD)

| Table         | Fields                                                                                      | Relations                                      |
|---------------|--------------------------------------------------------------------------------------------|------------------------------------------------|
| **Catalog**   | id (PK), name, type, basePrice                                                             | 1-to-many: Inventory (Catalog.id → Inventory.catalogId) |
| **Inventory** | id (PK), catalogId (FK), serialCode, status                                                | many-to-1: Catalog (catalogId → Catalog.id)<br>1-to-many: BookingItem (Inventory.id → BookingItem.inventoryId) |
| **Booking**   | id (PK), customerName, whatsappNumber, startDate, endDate, deliveryArea, fullAddress, totalPrice, status, createdAt, updatedAt | 1-to-many: BookingItem (Booking.id → BookingItem.bookingId) |
| **BookingItem** | id (PK), bookingId (FK), inventoryId (FK)                                                | many-to-1: Booking (bookingId → Booking.id)<br>many-to-1: Inventory (inventoryId → Inventory.id) |
| **ItemType**  | CONSOLE, ADDON                                                                             | enum                                           |
| **ItemStatus**| AVAILABLE, MAINTENANCE, RETIRED                                                            | enum                                           |
| **BookingStatus** | PENDING, WAITING_PAYMENT, CONFIRMED, ACTIVE, COMPLETED, CANCELLED                      | enum                                           |

---

#### Relasi Utama

- **Catalog** 1 --- * **Inventory**
- **Inventory** * --- 1 **Catalog**
- **Booking** 1 --- * **BookingItem**
- **Inventory** 1 --- * **BookingItem**
- **BookingItem** * --- 1 **Booking**
- **BookingItem** * --- 1 **Inventory**

---

#### Penjelasan Singkat

- **Catalog**: Daftar produk (misal, PS4, TV).
- **Inventory**: Unit fisik dari produk (misal, PS4-PRO-001).
- **Booking**: Data pemesanan pelanggan.
- **BookingItem**: Relasi antara booking dan unit fisik yang dipinjamkan.
- **Enum**: Tipe produk, status unit, status booking.

---

Jika ingin diagram visual, kamu bisa gunakan tools seperti dbdiagram.io atau mermaid-js.  
Butuh versi Mermaid?