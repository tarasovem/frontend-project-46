# Вычислитель отличий
[![Actions Status](https://github.com/tarasovem/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/tarasovem/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/76f187fb9f4d9fd5bab8/maintainability)](https://codeclimate.com/github/tarasovem/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/76f187fb9f4d9fd5bab8/test_coverage)](https://codeclimate.com/github/tarasovem/frontend-project-46/test_coverage)

Проект cli-утилиты для вычисления отличий между двумя файлами, содержащими структурные данные. Поддерживаются расширения "json", "yaml" и "yml".

## Требования
- nodejs и npm
- утилита "make"

## Установка
```shell
make install
make publish
```
Чтобы вызывать утилиту непосредственно по имени, необходимо в папке утилиты с правами администратора введсти следующую команду в терминале
```shell
npm link
```

## Как пользоваться
```shell
gendiff --format <'stylish', 'plain', 'json'> <путь к 1 файлу> <путь ко 2 файлу>
```

### Сравнение json файлов
[![asciicast](https://asciinema.org/a/m2GbQNG1u1XPZmygx7zPdW7P8.svg)](https://asciinema.org/a/m2GbQNG1u1XPZmygx7zPdW7P8)

### Сравнение yaml файлов
[![asciicast](https://asciinema.org/a/WNRN83yjhMW8joBL9Tkt5Snut.svg)](https://asciinema.org/a/WNRN83yjhMW8joBL9Tkt5Snut)

### Строчный формат вывода данных
[![asciicast](https://asciinema.org/a/MQf9IMPugimot1Jk29teOZeic.svg)](https://asciinema.org/a/MQf9IMPugimot1Jk29teOZeic)

### Вывод данных в json формате
[![asciicast](https://asciinema.org/a/v4etDUF3dHzG7h2NuUSiMNRGX.svg)](https://asciinema.org/a/v4etDUF3dHzG7h2NuUSiMNRGX)
