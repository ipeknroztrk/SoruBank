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
<img width="1431" alt="Ekran Resmi 2024-06-27 11 17 29" src="https://github.com/ipeknroztrk/SoruBank/assets/114228895/67b60820-d3f0-4203-a15c-b4e0443ecf58">
<img width="1436" alt="Ekran Resmi 2024-06-27 11 17 40" src="https://github.com/ipeknroztrk/SoruBank/assets/114228895/fe42a289-b6df-44c6-8eac-40fb3eb9a69a">
<img width="1425" alt="Ekran Resmi 2024-06-27 11 17 52" src="https://github.com/ipeknroztrk/SoruBank/assets/114228895/e683585c-4981-4e29-9eb5-fefc0c72398d">
<img width="1423" alt="Ekran Resmi 2024-06-27 11 18 07" src="https://github.com/ipeknroztrk/SoruBank/assets/114228895/7d350674-4eb0-4037-aa24-1f4d9ed5677b">
<img width="1433" alt="Ekran Resmi 2024-06-27 11 18 19" src="https://github.com/ipeknroztrk/SoruBank/assets/114228895/fe646842-6a89-4266-85b7-ad5131088d89">
<img width="1434" alt="Ekran Resmi 2024-06-27 11 18 25" src="https://github.com/ipeknroztrk/SoruBank/assets/114228895/0ac9a178-09c9-40ab-b19e-f8d187f1886d">
<img width="1430" alt="Ekran Resmi 2024-06-27 11 19 21" src="https://github.com/ipeknroztrk/SoruBank/assets/114228895/52dace4b-9bef-4956-8aff-11f26b43f84a">
<img width="1430" alt="Ekran Resmi 2024-06-27 11 19 29" src="https://github.com/ipeknroztrk/SoruBank/assets/114228895/4697ffec-35e6-4523-8530-e8312b5ebab5">
<img width="1420" alt="Ekran Resmi 2024-06-27 11 19 37" src="https://github.com/ipeknroztrk/SoruBank/assets/114228895/f0d70aaa-937a-4480-af50-0964cf458473">
<img width="1429" alt="Ekran Resmi 2024-06-27 11 19 46" src="https://github.com/ipeknroztrk/SoruBank/assets/114228895/6893f9c6-e96d-4932-957f-e7e89757c4b8">
<img width="1425" alt="Ekran Resmi 2024-06-27 11 19 51" src="https://github.com/ipeknroztrk/SoruBank/assets/114228895/698d070d-f853-4370-b1b0-4ee9dc0ed73f">

<img width="1417" alt="Ekran Resmi 2024-06-27 11 20 00" src="https://github.com/ipeknroztrk/SoruBank/assets/114228895/59dddc95-135f-4736-9df4-cfd4abcca7ef">


