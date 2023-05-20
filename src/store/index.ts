import EventBus from '../core/EventBus';
import Block from '../core/Block';
import { set } from '../utils/functions';

export enum StoreEvents {
  Updated = 'updated'
}

export class Index extends EventBus {
  private state: any = {};
  
  public set(path: string, data: unknown) {
    set(this.state, path, data);
    
    this.emit(StoreEvents.Updated, this.getState());
  }
  
  public getState() {
    return this.state;
  }
}

const store = new Index();

export function withStore(mapStateToProps: (state: any) => any) {
  return function wrap(Component: typeof Block) {
    let previousState: any;
    
    return class WithStore extends Component {
      constructor(props: any) {
        previousState = mapStateToProps(store.getState());
        
        super({ ...props, ...previousState });
        
        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());
          
          previousState = stateProps;
  
          this.setProps({ ...stateProps });
        });
      }
    };
  };
}

export default store;
