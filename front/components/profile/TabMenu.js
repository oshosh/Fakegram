import { ReadOutlined, UserAddOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import FollowList from './FollowList'
const { TabPane } = Tabs;

const TabList = ({ followerList, followingList }) => (
    <Tabs defaultActiveKey="1" centered>
        <TabPane tab={
            <span>
                <UserAddOutlined />
                팔로잉 (내가 넣은 사람)
            </span>
        }
            key="following"
        >
            <>
                <FollowList data={followingList} header={'사람'} />
            </>
        </TabPane>
        <TabPane
            tab={
                <span>
                    <UserAddOutlined />
                    팔로워 (나를 따른 사람)
                </span>
            }
            key="follower"
            prefixCls

        >
            <>
                <FollowList data={followerList} header={'사람'} />
            </>
        </TabPane>
        <TabPane tab={
            <span>
                <ReadOutlined />
                저장한 게시물
            </span>
        } key="saveContent">
            추후 예정
        </TabPane>
    </Tabs>
);

function TabMenu(props) {
    const { followerList, followingList } = props
    return (
        <div>
            <TabList
                followerList={followerList}
                followingList={followingList}
            />
        </div>
    );
}

export default TabMenu;