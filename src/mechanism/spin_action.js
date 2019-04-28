 export default function spin(userCoins) {
  let totalCoins = userCoins - 1 < 0 ? 0 : userCoins - 1;
  let reelsResult = [];
  if (totalCoins === 0) {
    return({
      ok: false,
      message: 'You don\'t have enough coins',
      coins: totalCoins
    });
  } 
  else {
    const reelMechanismValues = [
      {name: 'lemon', limits:[1,4]},
      {name: 'cherry', limits:5},
      {name: 'banana', limits:6},
      {name: 'apple', limits:[7,8]}
    ]

    const winningTable = [
      {
        name: 'lemon', 
        table:[
          { coincidences: 3, prize: 3 }
        ]
      },

      {
        name: 'banana',
        table: [
          { coincidences: 3, prize: 15 },
          { coincidences: 2, prize: 5 }
        ]
      },

      {
        name: 'apple',
        table: [
          { coincidences: 3, prize: 20 },
          { coincidences: 2, prize: 10 }
        ]
      },

      {
        name: 'cherry',
        table: [
          { coincidences: 3, prize: 50 },
          { coincidences: 2, prize: 40 }
        ]
      }

    ]

    const getRandomNumber = () => {
      const random = (Math.random() * 7) + 1;
      const floored = Math.floor(random);
      const result = (floored - random) * -1 < 0.5 ? floored : Math.ceil(random);
      return result;
    }

    const determinePertenence = (setedValue, numberValue) => {
      let min = 0, max = 0;
      if(Array.isArray(setedValue)) {
        if(setedValue.length !== 2) {
          return({
            ok: false,
            response: 'Array with a length of 2 expected'
          });
        } 
        else {
          min = setedValue[0];
          max = setedValue[1];


          return({
            ok:true,
            response: numberValue >= min && numberValue <= max
          });
        }
      }
      else if(typeof(setedValue)==="number") {
        return({
          ok: true,
          response: setedValue===numberValue
        });
      } 
      else {
        return({
          ok:false,
          response:'A number or an array with length of 2 expected'
        });
      } 
    }

    const checkWinner = (row)=> {
      let result = [];

      for(let i=0; i<row.length; i++) {
        if(row[i] === row[i+1]){
          result.push(row[i]);
          if(result.length<3){
            result.push(row[i+1]);
          }
        }
      }

      if(result.length > 1){
        const coincidences = result.length;
        const fruit = result[0];
        const tableRow = winningTable.filter(element => (element.name === fruit))
        const table = tableRow[0].table.filter(element => coincidences === (element.coincidences))
        if(!table[0]){
          return({
            winner:false,
            message: 'You Loose',
            coins: 0
          });
        } else {
          return({
            winner:true,
            message: `You're a winner! You won ${table[0].prize}`,
            coins: table[0].prize
          });
        }
      }
      return({
        winner:false,
        message: 'You Loose',
        coins: 0
      });
      
    } 

    for(let i = 0; i<3; i++){
      const random = getRandomNumber()
      const result = reelMechanismValues.filter(({limits}) => {
        const {ok, response} = determinePertenence(limits, random)
        return ok && response;
      });
      const { name } = result[0];
      reelsResult.push(name);
    }

    const {message, coins, winner} = checkWinner(reelsResult)
    
    totalCoins+=coins;
    console.log(message);
    return ({
      ok:true,
      result: reelsResult,
      coins: totalCoins,
      message,
      winner
    });
  }
}