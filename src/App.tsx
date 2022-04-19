import './generics';

function App() {
    // ====================================
    //типы примитивов number, string, boolean, null и undefined, any и object

    // ====================================
    //массивы
    const temps: readonly number[] = [1, 2, 3, 4, 5];

    // temps.sort(el=>el=1) изменяет

    // не изменияет
    temps.filter(el => (el = 1));

    const temps10: number[] = temps.map(el => el * 10);

    // тапл, указание конкретного количества элементов в массиве и их типов
    const coord: [number, number] = [12.2121, 54.4343];

    // ====================================
    //кастомные типы с большой буквы

    type ID = number | string;

    const userID: ID = 5;
    const userPost: ID = '21emkj123fds3';

    // состояние с union
    type ReqStatus = 'request' | 'success' | 'error';
    const req: ReqStatus = 'error';

    type CellSize = 2 | 4 | 6 | 8;
    const cell: CellSize = 4;

    // ====================================
    // interface

    interface PluginConf {
        // readonly нельзя изменять
        readonly selector: string;
        // ? объявляет свойство не обязательным
        perPage?: number;
        startIndex?: number;
        draggable: boolean;
    }
    const config: PluginConf = {
        selector: '#selector1',
        perPage: 1,
        startIndex: 0,
        draggable: false,
    };

    // описание объекта с одинаковыми по типу ключами и значениями
    interface Employees {
        [key: string]: number;
    }
    const employees: Employees = {
        leo: 5,
        kot: 4,
        ferret: 300,
        oeka: 2,
        ima: 100,
    };

    const entries = Object.entries(employees);
    let bestEmployeeName = '';
    let bestEmployeeIndex = 0;

    for (const [name, value] of entries) {
        if (bestEmployeeIndex <= value) {
            bestEmployeeIndex = value;
            bestEmployeeName = name;
        }
    }
    console.log('App ~ bestEmployeeName', bestEmployeeName);

    // extends
    interface Colorful {
        color: string;
    }

    interface Circle {
        radius: number;
    }

    interface ColorfulCircle extends Colorful, Circle {}

    const cc: ColorfulCircle = {
        color: 'red',
        radius: 42,
    };

    // ====================================
    // enum(перечисления)

    enum PizzaSize {
        Small, //console.log(PizzaSize.Small) / 0 - индекс
        Medium, //console.log(PizzaSize.Medium) / 1 - индекс
        Large = 'l', //console.log(PizzaSize.Large) / l - дефолтное значение
    }
    console.log('PizzaSize:', PizzaSize.Large);

    // ====================================
    // функции

    // интерфейс для описания функций лучше не юзать
    interface IAddFn {
        (a: number, b: number): number;
    }

    type AddFn = (a: number, b: number) => number;

    // const addExpression = (x:number, y:number):number=>{return x+y}
    const addExpression: AddFn = (x, y) => {
        return x + y;
    };
    const addArrow: IAddFn = function (x, y) {
        return x + y;
    };

    type Fn = (
        a: number,
        b: number,
        c: number,
        ...restParams: number[]
    ) => number;

    const fn: Fn = (x, y, z, ...restParams) => {
        return 4;
    };
    // void если функция ничего не возвращает
    type LogFn = (m: string) => void | string;

    const log: LogFn = message => {
        console.log(message);
    };

    addExpression(1, 2);
    addArrow(2, 3);
    fn(1, 2, 3, 4, 5, 6, 7, 8, 9);
    log('hello');

    // описание объекта с методами
    enum PizzzaSize {
        Small = 's',
        Medium = 'm',
        Lagre = 'l',
    }

    interface IPizza {
        size: PizzzaSize.Small | PizzzaSize.Medium | PizzzaSize.Lagre;
        toppings: string[];
        // logSize:()=>void - старый синтаксис
        logSize(): void;
        getSize(): string;
        // ? - не обязательный параметр
        addToppings?(topping: string): void;
    }

    const pizza: IPizza = {
        size: PizzzaSize.Medium,
        toppings: ['cream', 'sause'],
        logSize() {
            console.log(this.size);
        },
        getSize() {
            return this.size;
        },
        addToppings(topping) {
            this.toppings.push(topping);
        },
    };

    console.log('pizza:', pizza);

    // ====================================
    // классы
    interface Params {
        size: string;
        toppings: string[];
    }

    interface IPizzza {
        size: string;
        addToppings(toppings: string): void;
    }

    class Pizza implements IPizzza {
        public size: string;
        private toppings: string[];

        constructor({ size, toppings = [] }: Params) {
            this.size = size;
            this.toppings = toppings;
        }

        private validateToppings(topping: string): boolean {
            console.log(topping);
            // валидация

            return true;
        }

        public addToppings(topping: string) {
            this.validateToppings(topping);
            this.toppings.push(topping);
        }
    }

    const pizzza: IPizzza = new Pizza({
        size: 'm',
        toppings: ['chees', 'tomato'],
    });
    console.log('pizza:', pizzza);

    // ====================================
    //log
    console.log(
        cc,
        employees,
        config,
        temps,
        req,
        temps10,
        coord,
        userID,
        userPost,
        cell,
    );

    return (
        <div className="App">
            <h1>Hello</h1>
        </div>
    );
}

export default App;
