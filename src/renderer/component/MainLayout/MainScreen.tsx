import * as React from 'react';
import ImageLibrary from 'src/renderer/component/ImageLibrary/ImageLibrary';
import Settings from '../Profile/Account/Settings';
import Templates from '../Templates/Templates';
import Layouts from 'src/renderer/component/Layouts/Layouts';
import Swipe from 'src/renderer/component/Swipe/Swipe';
import { Snippets } from 'src/renderer/component/Snippets/Snippets';
import { Route, Switch as SwitchRoute } from 'react-router-dom';

const MainScreen = () => {
  return (
    <>
      <Route path='/emails' render={() => <Templates/>} />
      {/*<Route path='/image-library' component={ImageLibrary}/>*/}
      <Route path='/image-library' render={() => <ImageLibrary/>} />
      {/*<Route path='/layouts' component={Layouts}/>*/}
      <Route path='/layouts' render={() => <Layouts/>} />
      {/*<Route path='/snippets' component={Snippets}/>*/}
      <Route path='/snippets' render={() => <Snippets/> }/>
      {/*<Route path='/swipe' component={Swipe}/>*/}
      <Route path='/swipe' render={() => <Swipe/>} />
      {/*<Route path='/settings' component={Settings}/>*/}
      <Route path='/settings' render={() => <Settings/>} />
    </>
  );
};

export default MainScreen;
