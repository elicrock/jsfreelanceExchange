document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const customer = document.getElementById('customer'),
        freelancer = document.getElementById('freelancer'),
        blockCustomer = document.getElementById('block-customer'),
        blockFreelancer = document.getElementById('block-freelancer'),
        blockChoice = document.getElementById('block-choice'),
        btnExit = document.getElementById('btn-exit'),
        formCustomer = document.getElementById('form-customer'),
        ordersTable = document.getElementById('orders'),
        modalOrder = document.getElementById('order_read'),
        modalOrderActive = document.getElementById('order_active');
  
  const orders = [];
    
  const renderOrders = () => {
    
    ordersTable.textContent = '';

    orders.forEach((order, i) => {
      const dateOrder = new Date(Date.parse(order.deadline))
  .toLocaleDateString("ru", {day: 'numeric', month: 'numeric', year: 'numeric',});

      ordersTable.innerHTML += `
      <tr class="order" data-number-order="${i}">
        <td>${i+1}</td>
        <td>${order.title}</td>
        <td class="${order.currency}"></td>
        <td>${dateOrder}</td>
      </tr>
    `;
    });
  };

  const openModal = (numberOrder) => {
    const order = orders[numberOrder];
    console.log('order: ', order);
    const modal = order.active ? modalOrderActive : modalOrder;
    const dateOrder = new Date(Date.parse(order.deadline))
  .toLocaleDateString("ru", {day: 'numeric', month: 'numeric', year: 'numeric',});

    const titleBlock = document.querySelector('.modal-title'),
          firstNameBlock = document.querySelector('.firstName'),
          emailBlock = document.querySelector('.email'),
          descriptionBlock = document.querySelector('.description'),
          deadlineBlock = document.querySelector('.deadline'),
          currencyBlock = document.querySelector('.currency_img'),
          countBlock = document.querySelector('.count'),
          phoneBlock = document.querySelector('.phone');

          
          titleBlock.textContent = order.title;
          firstNameBlock.textContent = order.firstName;
          emailBlock.innerHTML = `<a class="email" href="mailto:${order.email}">${order.email}</a>`;
          descriptionBlock.textContent = order.description;
          deadlineBlock.textContent = dateOrder;
          currencyBlock.innerHTML = `<span class="${order.currency}"></span>`;
          countBlock.textContent = order.amount;
          phoneBlock.innerHTML = `<a class="phone text-white" href="tel:${order.phone}">Связаться</a>`;

    modal.style.display = 'block';
  };

  ordersTable.addEventListener('click', event => {
    const target = event.target;

    const targetOrder = target.closest('.order');
    if (targetOrder) {
      openModal(targetOrder.dataset.numberOrder);
    }

    // console.log(orders[targetOrder.dataset.numberOrder]);

  });
  
  customer.addEventListener('click', () => {
    blockChoice.style.display = 'none';
    blockCustomer.style.display = 'block';
    btnExit.style.display = 'block';
  });
  
  freelancer.addEventListener('click', () => {
    blockChoice.style.display = 'none';
    renderOrders();
    blockFreelancer.style.display = 'block';
    btnExit.style.display = 'block';
  });

  btnExit.addEventListener('click', () => {
    btnExit.style.display = 'none';
    blockCustomer.style.display = 'none';
    blockFreelancer.style.display = 'none';
    blockChoice.style.display = 'block';
  });

  formCustomer.addEventListener('submit', (event) => {
    event.preventDefault();

    const obj = {};

    // forEach
    [...formCustomer.elements].forEach((elem) => {
      if ((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
          (elem.type === 'radio' && elem.checked) ||
          elem.tagName === 'TEXTAREA') {
        obj[elem.name] = elem.value;
      }
    
    });

    formCustomer.reset();

    // filter
    // const elements = [...formCustomer.elements]
    //   .filter((elem) => (elem.tagName === 'INPUT' && elem.type !== 'radio') ||
    //     (elem.type === 'radio' && elem.checked) ||
    //     elem.tagName === 'TEXTAREA');
    
    // elements.forEach((elem) => {
    //   obj[elem.name] = elem.value;
    // });
    
    // for in
    // for (const elem of formCustomer.elements) {
      // if ((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
      //     (elem.type === 'radio' && elem.checked) ||
      //     elem.tagName === 'TEXTAREA') {
      //   obj[elem.name] = elem.value;
      // }

      // if (elem.type !== 'radio') {
      //   elem.value = '';
      // }
    // }

    orders.push(obj);
    // console.log(orders);
  });

  

});