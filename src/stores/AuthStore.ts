import { makeAutoObservable, runInAction } from 'mobx';

export interface ISignInForm {
  email: string;
  password: string;
}

export interface IUserData {
  id: number;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

class AuthStore {
  user: IUserData | null = null;

  signInUserLoadingStatus = 'pending';

  users: IUserData[] = [
    { id: 1, email: 'admin@admin.com', password: '67890', role: 'admin' },
    { id: 2, email: 'user@user.com', password: '12345', role: 'user' },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  getUserFromLocalStorage = (): void => {
    const userJson = localStorage.getItem('user');
    runInAction(() => {
      this.user = userJson ? (JSON.parse(userJson) as IUserData) : null;
    });
  };

  setsSignInUserLoadingStatus = (newStatus: string) => {
    runInAction(() => {
      this.signInUserLoadingStatus = newStatus;
    });
  };

  setUser = (userData: IUserData | null) => {
    runInAction(() => {
      this.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
    });
  };

  signInUser = async (formData: ISignInForm): Promise<IUserData> => {
    this.setsSignInUserLoadingStatus('loading');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userData: IUserData | undefined = this.users.find(
          (user) => user.email === formData.email && user.password === formData.password
        );

        if (userData) {
          this.setsSignInUserLoadingStatus('done');
          resolve(userData);
        } else {
          this.setsSignInUserLoadingStatus('error');
          reject(new Error());
        }
      }, 1000);
    });
  };

  logOutUser = () => {
    setTimeout(() => {
      this.setUser(null);
    }, 500);
  };
}

const authStore = new AuthStore();

export default authStore;
