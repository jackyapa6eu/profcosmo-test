import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { message } from 'antd';

export interface ITask {
  id: number;
  name: string;
  author: string;
  text?: string;
  done: boolean;
}

export interface ICreateFormValues {
  name: string;
  author: string;
  text?: string;
}

interface ISelectOption {
  value: string;
}

interface IFiltersOptions {
  [key: string]: ISelectOption[];
}

interface IFilterSettings {
  [key: string]: string | boolean;
}

type ISortOrder = 'asc' | 'desc';

class TasksStore {
  tasks: ITask[] = [
    {
      id: 1,
      name: 'Найти сокровище под столом',
      author: 'admin@admin.com',
      text: 'После глубоких исследований обнаружено, что сокровище находится под столом в кухне. Приступить к экспедиции немедленно!',
      done: false,
    },
    {
      id: 2,
      name: 'Отладить баг в коде',
      author: 'dev@frontend.com',
      text: 'Найти и устранить мистический баг, который появляется только по пятницам после обеда.',
      done: false,
    },
    {
      id: 3,
      name: 'Придумать имена для перем',
      author: 'coder@code.com',
      text: 'Найти креативные имена для переменных, чтобы никто не понял, что это такое.',
      done: false,
    },
    {
      id: 4,
      name: 'Запустить npm install',
      author: 'admin@admin.com',
      text: 'Запустить npm install и наблюдать, как появляются магические папки node_modules.',
      done: false,
    },
    {
      id: 5,
      name: 'Добавить консоль.log',
      author: 'debugger@debug.com',
      text: 'Добавить console.log в каждую строку кода для полного контроля.',
      done: false,
    },
    {
      id: 6,
      name: 'Обновить документацию',
      author: 'docwriter@docs.com',
      text: 'Обновить документацию к проекту, чтобы она выглядела так же запутанно, как и сам проект.',
      done: false,
    },
    {
      id: 7,
      name: 'Сделать деплой в пятницу',
      author: 'risklover@dev.com',
      text: 'Сделать деплой на продакшен в пятницу вечером, чтобы выходные прошли весело.',
      done: false,
    },
    {
      id: 8,
      name: 'Сменить все цвета на красный',
      author: 'designer@uiux.com',
      text: 'Сделать все кнопки и текст красного цвета, потому что так хочет заказчик.',
      done: false,
    },
    {
      id: 9,
      name: 'Сделать кофе для команды',
      author: 'admin@admin.com',
      text: 'Сделать кофе для всей команды, чтобы продуктивность взлетела до небес.',
      done: false,
    },
    {
      id: 10,
      name: 'Добавить анимацию загрузки',
      author: 'frontend@design.com',
      text: 'Добавить красивую анимацию загрузки, чтобы пользователи забыли, что сайт долго грузится.',
      done: false,
    },
    {
      id: 11,
      name: 'Зарезолвить merge conflict',
      author: 'dev@frontend.com',
      text: 'Зарезолвить merge conflict без помощи Stack Overflow.',
      done: false,
    },
    {
      id: 12,
      name: 'Пересмотреть все тиктоки',
      author: 'admin@admin.com',
      text: 'Пересмотреть все тиктоки за неделю, чтобы узнать о новых трендах в разработке.',
      done: false,
    },
    {
      id: 13,
      name: 'Проверить кроссбраузерность',
      author: 'tester@qa.com',
      text: 'Проверить кроссбраузерность сайта на всех существующих браузерах и их версиях.',
      done: false,
    },
    {
      id: 14,
      name: 'Обновить все зависимости',
      author: 'updater@dev.com',
      text: 'Обновить все зависимости в проекте и молиться, чтобы ничего не сломалось.',
      done: false,
    },
    {
      id: 15,
      name: 'Создать новую ветку',
      author: 'admin@admin.com',
      text: 'Создать новую ветку для работы над фичей и забыть переключиться обратно.',
      done: false,
    },
    {
      id: 16,
      name: 'Покрыть код тестами',
      author: 'tester@qa.com',
      text: 'Написать тесты для кода, который невозможно сломать (или сломать можно, но это никому не скажем).',
      done: false,
    },
    {
      id: 17,
      name: 'Сменить favicon',
      author: 'designer@uiux.com',
      text: 'Сменить favicon на новый, чтобы сайт стал еще красивее.',
      done: false,
    },
  ];

  filteredTasks: ITask[] = [];

  filtersOptions: IFiltersOptions = {};

  filterSettings: IFilterSettings = {};

  sortOrder: ISortOrder = 'asc';

  sortSettings = {
    asc: (a: ITask, b: ITask) => a.id - b.id,
    desc: (a: ITask, b: ITask) => b.id - a.id,
  };

  constructor() {
    this.makeFiltersOptions();

    this.filterTasks();

    makeAutoObservable(this);
  }

  makeFiltersOptions = (): any => {
    const initialOptions: { name: Set<string>; author: Set<string> } = {
      name: new Set<string>(),
      author: new Set<string>(),
    };

    const options = this.tasks.reduce((acc, task) => {
      acc.name.add(task.name);
      acc.author.add(task.author);
      return acc;
    }, initialOptions);

    this.filtersOptions = {
      name: Array.from(options.name).map((el) => ({ value: el })),
      author: Array.from(options.author).map((el) => ({ value: el })),
    };
  };

  handleFilterSelect = (field: string, value: string | boolean) => {
    const filtersCopy = { ...this.filterSettings };
    if (value === undefined) {
      delete filtersCopy[field];
    } else filtersCopy[field] = value;
    runInAction(() => {
      this.filterSettings = filtersCopy;
    });
    this.filterTasks();
  };

  filterTasks = () => {
    runInAction(() => {
      this.filteredTasks = this.tasks.filter((el) => {
        let result = true;
        Object.entries(this.filterSettings).forEach(([field, value]) => {
          if (field in el && el[field as keyof ITask] !== value) result = false;
        });
        return result;
      });
    });
    this.sortTasks();
  };

  handleSort = () => {
    runInAction(() => {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    });
    this.sortTasks();
  };

  sortTasks = () => {
    runInAction(() => {
      this.filteredTasks = this.filteredTasks.sort(this.sortSettings[this.sortOrder]);
    });
  };

  createTask = ({ name, author, text }: ICreateFormValues) => {
    const id = this.tasks[this.tasks.length - 1].id + 1;
    const newTask = {
      id,
      name,
      author,
      text,
      done: false,
    };
    setTimeout(() => {
      runInAction(() => {
        this.tasks = [...this.tasks, newTask];
        this.filterSettings = {};
        this.filterTasks();
        this.sortOrder = 'desc';
        this.sortTasks();
        this.makeFiltersOptions();
        message.success('Задача успешно создана.');
      });
    }, 300);
  };

  editTask = (updatedTask: ITask) => {
    runInAction(() => {
      this.tasks = this.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
      this.filterTasks();
      this.sortTasks();
      message.success('Задача успешно изменена');
    });
  };
}

const tasksStore = new TasksStore();

export default tasksStore;
