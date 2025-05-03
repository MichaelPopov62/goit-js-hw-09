// оголошую об'єк formData з ключами які мають початкове значення порожній рядок.Ці ключі відповідають полям форми.В цьому об'єкті будут зберігатися значення які вводить користувач
const formData = {
  email: '',
  message: '',
};

//знаходжу форму за домомогою селектора класу feedback-form 
  const form = document.querySelector('.feedback-form');

//Створюю функцію для перевірки наявності форми. Якщо форма не буде знайдена виконання функціі прервется і код нне буде виконан
  function checkForm() {
  console.log('Форма знайдена', form);
  if (!form) {
    console.error('Форма з классом feedback-form не знайдена!');
    return;
  }
}
checkForm();

// створюю змінну ключ для зберігання данних у localStorage
  const STORAGE_KEY = 'feedback-form-state';

//створюю функцію для заполнения форми данними з localStorage
  function populateFormFromStorage() {
    
//отримую данні з локального сховища в  змінну
  const savedLSData = localStorage.getItem(STORAGE_KEY);

//Якщо данні існують парсимо іх із JSON і оновлюємо об'єкт formData та поля форм.
  if (savedLSData) {
    console.log('Знайдено данні у локальному сховищі:', savedLSData);

    // парсимо данні із JSON у JS-об'єкт
    const parsedData = JSON.parse(savedLSData);

    // оновлюю данні в полі email або залишаю порожнім
    formData.email = parsedData.email || '';

    //оновлюю данні в полі message або залишаю порожнім
    formData.message = parsedData.message || '';

    //заповнюєм поля form значенням з об'єкта formData
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;

    //перевіряємо заповнення форм
    console.log('Форма заповнена з локального сховища:', formData);
  } else {
    console.log('Локальне сховище порожне.Поля лишаються порожні');
  }
}

//викликаю функцію
  populateFormFromStorage();

//додаю обробника подіі 'input' до форми
  form.addEventListener('input', evt => {
    
/*отримую елемент на якому сталася подія, evt.target вказує на якому елементі це сталося(input textarea)*/
  const { name, value } = evt.target;

//перевіряємо подію input
  console.log(`Подія input: Поле - ${name}, Знвчення - ${value}`);

/*перевіряю чи має елемент атрібут "name".Для того щоб працювати з очікуваними елементами форми*/
  if (!name) {
    
// перевіряємо
  console.log('Елемент не має отрібута name- пропускаємо ');
    return;
    }
    
//оновлюємо необхідне поле в об'єкті formData.Якщо це email оновлюеться formData.email
  formData[name] = value;
    
//перевіряємо актуальний стан formData
  console.log('Оновлено formData:', formData);

/*Зберігаю актуальний стан об'єкта на localStorage. Так як localStorage зберігає тільки рядки перетворюжмо об'єкт на JSON- */
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

//перевіряємо
  console.log('Оновлено formData:', formData);

  //перевіряємо збереження на localStorage
  // console.log("formData збережено на localStorage")
  });

// додаємо обробник подіі на 'Sabmit'для перевірки полів та очіщення форми
  form.addEventListener('submit', evt => {

//виключаю перезавантаження сторінки після надсилання форми
  evt.preventDefault();
    
// перевіряю чі всі поля заповнені
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    console.log('Заповніть усі поля перед відправленням');
    return;
    }
    
// якщо всі поля заповнені
  console.log('Форма відправлена :', formData);

//очищення локального сховища
  localStorage.removeItem(STORAGE_KEY);
    
//очищення поля форми та об'єкта formData
  form.reset();
  formData.email = '';
  formData.message = '';
//перевіряємо
  console.log('Локальне сховище очищено.Поля форми скинуто');
});
