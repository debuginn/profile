import {Outlet} from 'umi';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Layout() {
    return (
        <div>
            <Outlet/>
        </div>
    );
}
