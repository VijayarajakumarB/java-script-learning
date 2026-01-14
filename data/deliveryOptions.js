import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function getDeliveryOptions(deliveryOptId){

    let deliveryOption;

      deliveryOptiions.forEach(options => {
        if(options.id === deliveryOptId){
          deliveryOption = options;
        }
      });

    return deliveryOption;
}


export function calculateDeliveryDate(deliveryOption){

    const today = dayjs();

    for(let i=0; i<=deliveryOption; i++){
        let dayOfWeek = today.add(i, 'days').format('dddd');
        if(dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'){
            deliveryOption++;
        }
    }

    return today.add(deliveryOption, 'days').format('dddd, MMMM DD');
}

export const deliveryOptiions = [{
    id : '1',
    deiveryDate : 7,
    priceCents : 0
}, {
    id : '2',
    deiveryDate : 3,
    priceCents : 499
}, {
    id : '3',
    deiveryDate : 1,
    priceCents : 999
}];