# Web приложение для добрых дел

## Задание

Реализовать функционал списка добрых дел:
- Регистрации, авторизация, обновление данных, удаления 
пользователя (в дальнейшем CRUD); 
- Авторизованный пользователь управляет своим списком добрых 
дел (CRUD);
- Авторизованный пользователь может добавлять людей по общедоступному уникальному идентификатору в друзья и 
смотреть их список добрых дел.

## Настройка приложения

Перед запуском приложения небходимо поменять конфигурацию базы данных.

Файл с конфигурацией базы расположен по следующему пути:

```
backend\src\db_config\db.config.ts
```

В данном файле необходимо поменять следующие параметры:
*host*, *port*, *username*, *password*, *database*.

В приложении эти параметры представлены в виде констант, 
которые расположены в следующем файле:

```
backend\src\constants\db.properties.ts
```
