import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaHome, FaInfo, FaContact } from 'react-icons/fa';

const Layout = () => {
    return (
        <div>
            <Tabs>
                <TabList>
                    <Tab><FaHome /> Home</Tab>
                    <Tab><FaInfo /> About</Tab>
                    <Tab><FaContact /> Contact</Tab>
                </TabList>

                <TabPanel>
                    <h2>Home Content</h2>
                    <p>Welcome to the home page!</p>
                </TabPanel>
                <TabPanel>
                    <h2>About Content</h2>
                    <p>Learn more about us on this page.</p>
                </TabPanel>
                <TabPanel>
                    <h2>Contact Content</h2>
                    <p>Get in touch with us here.</p>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Layout;