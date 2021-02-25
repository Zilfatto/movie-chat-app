import Movies from '../src/components/Movies';
import { Layout } from 'antd';

import './App.css';
import 'antd/dist/antd.css';


function App() {
  const { Content } = Layout;
  return (
    <main className="App">
      <Layout className="mainLayout">
        <Content>
            <Movies />
        </Content>
      </Layout>
    </main>
  );
}

export default App;
