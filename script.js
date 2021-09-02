document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    // select.addEventListener('change', () => {
    //     const request = new XMLHttpRequest();
    //     request.open('GET', './cars.json');
    //     request.setRequestHeader('Content-type', 'application/json');
    //     request.send();
    //     request.addEventListener('readystatechange', () => {
    //         if (request.readyState === 4 && request.status === 200) {
    //             const data = JSON.parse(request.responseText);
    //             data.cars.forEach(item => {
    //                 if (item.brand === select.value) {
    //                     const {brand, model, price} = item;
    //                     output.innerHTML = `Тачка ${brand} ${model} <br>
    //                     Цена: ${price}$`;
    //                 }
    //             });
    //         } else {
    //             output.innerHTML = 'Произошла ошибка';
    //         }
    //     });
    // });
   
    select.value = 'no';
    const promise = () => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', './cars.json');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send();
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    const data = JSON.parse(request.responseText);
                    resolve(data);
                } else {
                    reject(request.statusText);
                }
            });
        });
    };

    const showCars = (data) => {
        data.cars.forEach(elem => {
            if (elem.brand === select.value) {
                const {brand, model, price} = elem;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                Цена: ${price}$`;
            }
        });
    };

    select.addEventListener('change', () => {

        promise()
            .then(showCars)
            .catch(error => console.error(error));

    });

});