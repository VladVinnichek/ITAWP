const namesList = document.getElementById('namesList');
        const names = [];
        
        while (true) {
            const input = prompt('Введите фамилию и имя (через пробел) или нажмите "Отмена" для завершения:');
            
            if (input === null) {
                break;
            }
            const trimmedInput = input.trim();
            if (trimmedInput === '') {
                continue;
            }
            names.push(trimmedInput);
        }
        
        if (names.length > 0) {
            names.forEach(name => {
                const li = document.createElement('li');
                li.textContent = name;
                namesList.appendChild(li);
            });
        } else {
            namesList.innerHTML = '<li>Нет введённых данных</li>';
        }