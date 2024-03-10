const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 27;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG ATTCK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';
let hasBonusLife = true;
let battleLog = [];

const enrteredValue = prompt("Please enter the Maximum life", '100'); // 파이썬의 input 함수와 동일하다. 
let chosenMaxLife = parseInt(enrteredValue);
if(isNaN(chosenMaxLife) || chosenMaxLife < 0){
    chosenMaxLife = 100;
}

adjustHealthBars(chosenMaxLife);
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

function writeToLog(ev, val, monsterHealth, playerHealth){
    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    }
    if(ev === LOG_EVENT_PLAYER_ATTACK){
        logEntry.target = 'MONSTER';
    } else if(ev === LOG_EVENT_PLAYER_STRONG_ATTACK){
        logEntry.target = 'MONSTER';
    } else if(ev === LOG_EVENT_MONSTER_ATTACK){
        logEntry.target = 'PLAYER';
    } else if(ev === LOG_EVENT_PLAYER_HEAL){
        logEntry.target = 'PLAYER';
    } else if(ev === LOG_EVENT_GAME_OVER){
        // 여기는 아무것도 작성하지 않아도 된다. 
    }
    battleLog.push(logEntry);
}
 
function reset() {
    let currentMonsterHealth = chosenMaxLife;
    let currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endround() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);
    if (currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife(); 
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('Lucky Bitch');
    }
    if(currentMonsterHealth <=0 && currentPlayerHealth > 0){
        alert('You Won');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
    }
    else if(currentPlayerHealth <=0 && currentMonsterHealth > 0){
        alert('You lost');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
    }
    else if(currentMonsterHealth <= 0 && currentPlayerHealth <= 0){
        alert('Draw');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'A DRAW',
            currentMonsterHealth,
            currentPlayerHealth
        );
    }
    if(currentMonsterHealth <= 0 || currentPlayerHealth <= 0){
        reset();
    }
}
function attackMonster(attack){
    let attackDamage = attack === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    let logEvent = attack === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK; // 모드의 종류에 따라 공격의 강도가 바뀌기 때문이다. 
    // if(attack === 'ATTACK'){
    //     attackDamage = ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_ATTACK;
    // }
    // else if(attack === 'STRONG ATTACK'){
    //     attackDamage = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    // }
    const damage = dealMonsterDamage(attackDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endround();

}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHanlder(){
    attackMonster('STRONG ATTACK');
}

function healHanlder(){
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
        alert("You can't heal");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else{
        healValue = HEAL_VALUE; 
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endround();
}

function printLogHandler(){
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHanlder);
healBtn.addEventListener('click', healHanlder);
logBtn.addEventListener('click', printLogHandler);
