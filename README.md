Soru Bankası Projesi
Bu proje, React.js ve .NET Core kullanılarak geliştirilmiş bir soru bankası sistemidir. Öğretmenlerin sınav ekleme, silme, sınav listelerini ve sınav detaylarını görüntüleme işlemlerini yapabilmesini sağlar. Ayrıca, öğrencinin üzerine tıklayarak hangi sınavlara girdiği ve doğru-yanlış sayısını görüntüleyebilirler. Proje PostgreSQL veritabanı kullanılarak geliştirilmiştir ve code-first migration'lar oluşturulmuştur.

Özellikler
Öğretmenler için sınav ekleme ve silme işlemleri
Sınav listesini görüntüleme
Sınav detaylarını görüntüleme
Öğrenci performansını görüntüleme (girdiği sınavlar ve doğru-yanlış sayıları)
Teknolojiler
Frontend: React.js
Backend: .NET Core
Veritabanı: PostgreSQL
ORM: Entity Framework Core (Code-First)
Kurulum
Gereksinimler
.NET Core SDK
Node.js ve npm
PostgreSQL
Adımlar
Backend'i Kurun:

Proje dizinine gidin ve aşağıdaki komutla bağımlılıkları yükleyin:
bash
Kodu kopyala
dotnet restore
Veritabanını oluşturmak için migration'ları uygulayın:
bash
Kodu kopyala
dotnet ef database update
Backend'i başlatın:
bash
Kodu kopyala
dotnet run
Frontend'i Kurun:

client-app dizinine gidin ve bağımlılıkları yükleyin:
bash
Kodu kopyala
npm install
Frontend'i başlatın:
bash
Kodu kopyala
npm start
Kullanım
Öğretmenler, sisteme giriş yaparak sınav ekleyebilir, silebilir ve mevcut sınavları görüntüleyebilir.
Öğrencinin üzerine tıklayarak, öğrencinin girdiği sınavları ve doğru-yanlış sayılarını görüntüleyebilirsiniz.
Katkıda Bulunma
Katkıda bulunmak isterseniz, lütfen bir pull request gönderin veya bir issue açın.
