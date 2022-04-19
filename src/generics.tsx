// дженерик с одним параметром

const reverse = <T,>(array: T[]) => [...array].reverse();

console.log('reverse', reverse([1, 2, 3, 4, 5]));
console.log('reverse', reverse(['qwe', 'asd', 'zxc', 'cvb', 'dfg']));
console.log(
    'reverse',
    reverse([{ qwe: 'asd' }, { zxc: 'cvb' }, { dfg: 'sda' }]),
);

// дженерик с N параметрами

const isEqual = <T, Y>(a: T, b: Y) => Object.is(a, b);

console.log('isEqual', isEqual(3, 3));
console.log('isEqual', isEqual(3, '2'));

const makeArray = <T, Y>(a: T, b: Y) => [a, b];

console.log('makeArray', makeArray(3, 5));
console.log('makeArray', makeArray(3, 'sad'));
console.log('makeArray', makeArray(true, 5));

//Extends

// Пример с интерфесом
// interface ILength {
//     length: number;
// }

// const logLength = <T extends ILength>(arg: T) => {
//     console.log('logLength', arg.length);
// };

const logLength = <T extends { length: number }>(arg: T) => {
    console.log('logLength', arg.length);
};

logLength([1, 2, 3, 4]);
logLength('qweqweqwe');
// logLength(5); ошибка, так как у 5 нет свойства length

interface IPerson {
    lastName: string;
    firstName: string;
}

const addFullName = <T extends IPerson>(person: T) => {
    return { ...person, fullname: `${person.firstName} ${person.lastName}` };
};

console.log(
    'addFullName',
    addFullName({
        firstName: 'Leo',
        lastName: 'Br',
    }),
);

console.log(
    'addFullName',
    addFullName({
        firstName: 'Kot',
        lastName: 'Kr',
        age: 35,
    }),
);

// дженерик интерфейса

interface User<T> {
    id: T;
}

const Leo: User<number> = { id: 5 };
const Kot: User<string> = { id: '123' };

console.log(Leo, Kot);

interface Tab<T> {
    id: string;
    position: number;
    active: boolean;
    content: T;
}

const Tab1: Tab<string> = {
    id: 'id-1',
    position: 1,
    active: false,
    content: 'Hello',
};

const Tab2: Tab<string[]> = {
    id: 'id-2',
    position: 3,
    active: true,
    content: ['Hello', 'Привет'],
};

console.log(Tab1, Tab2);

// пример

type TAnimationState = 'playing' | 'paused';
type THttpState = 'request' | 'success' | 'error';

const makeState = <S,>(initialState: S) => {
    let state = initialState;

    const getState = () => state;

    const setState = (newState: S) => (state = newState);

    return { getState, setState };
};

const animationState = makeState<TAnimationState>('playing');
animationState.setState('playing');
// animationState.setState('error'); Ошибка

const httpState = makeState<THttpState>('success');
httpState.setState('error');
// httpState.setState('paused'); Ошибка

// Классы

class State<S> {
    private state: S;

    constructor(initialState: S) {
        this.state = initialState;
    }

    getState() {
        return this.state;
    }

    setState(newState: S) {
        this.state = newState;
    }
}

const animationClassState = new State<TAnimationState>('playing');
animationState.setState('playing');
// animationState.setState('error'); Ошибка

const httpClassState = new State<THttpState>('success');
httpState.setState('error');
// httpState.setState('paused'); Ошибка

export {};
