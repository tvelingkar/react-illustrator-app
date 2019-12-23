import React from 'react';
import { Link } from 'react-router-dom';
import Add20 from "@carbon/icons-react/lib/add/20";
import HeaderContainer from "carbon-components-react/lib/components/UIShell/HeaderContainer";
import {
    Header,
    HeaderMenuButton,
    HeaderName,
    HeaderGlobalBar,
    HeaderGlobalAction,
    SkipToContent,
    SideNav,
    SideNavItems,
    SideNavLink
} from "carbon-components-react/lib/components/UIShell";

import './Navbar.css';

const Fade16 = () => (
    <svg
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
    >
        <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
    </svg>
);

const Navbar = () => {
    return (
        // <nav
        //     className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
        //     id="mainNav">
        //     <div className="container">
        //         <Link className="navbar-brand" to="/">Todo App</Link>
        //         <button
        //             className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded"
        //             type="button"
        //             data-toggle="collapse"
        //             data-target="#navbarResponsive"
        //             aria-controls="navbarResponsive"
        //             aria-expanded="false"
        //             aria-label="Toggle navigation">
        //             Menu
        //             <i className="fas fa-bars"></i>
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarResponsive">
        //             <ul className="navbar-nav ml-auto">
        //                 <li className="nav-item mx-0 mx-lg-1">
        //                     <button type="button" className="btn btn-outline-info">
        //                     <Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/add-todo">
        //                         <svg className="icon" viewBox="0 0 8 8">
        //                             <use xlinkHref='/assets/fonts/open-iconic.min.svg#plus' className="icon-plus"></use>
        //                         </svg>
        //                     </Link>
        //                     </button>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </nav>
        <HeaderContainer
            render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                <>
                    <Header aria-label="Todo App">
                        <SkipToContent />
                        <HeaderMenuButton
                            aria-label="Open menu"
                            onClick={onClickSideNavExpand}
                            isActive={isSideNavExpanded}
                        />
                        <HeaderName href="#" prefix="Todo App"></HeaderName>
                        <HeaderGlobalBar>
                            <Link to="/add-todo">
                                <HeaderGlobalAction aria-label="App Switcher">
                                    <Add20 />
                                </HeaderGlobalAction>
                            </Link>
                        </HeaderGlobalBar>
                        <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
                            <SideNavItems>
                                <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                                    Link
                </SideNavLink>
                                <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                                    Link
                </SideNavLink>
                            </SideNavItems>
                        </SideNav>
                    </Header>
                </>
            )}
        />
    );
}

export default Navbar;