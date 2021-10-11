import React, { useMemo } from 'react';
import PropTypes from 'prop-types'

import { Button, Card, List } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ListHeader = styled.span`
    color:#262626;
    font-weight: 600;
    font-size: 1.1rem;
`

function FollowList({ header, data }) {
    const ListBoxStyle = useMemo(() => ({ borderRadius: "10px", marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }))
    const addBtnStyle = useMemo(() => ({ textAlign: "center", margin: '0 10px' }))
    const TabListBoxStyle = useMemo(() => ({ margin: '8px' }))

    return (
        <List
            style={ListBoxStyle}
            grid={{ gutter: 4, xs: 2, md: 3, column: 5 }}
            header={
                <ListHeader>
                    {header}
                </ListHeader>
            }
            loadMore={
                <div
                    style={addBtnStyle}
                >
                    <Button icon={<PlusOutlined />} >더 보기</Button>
                </div>
            }
            dataSource={data}
            renderItem={(item) => {
                return (
                    <List.Item style={TabListBoxStyle}>
                        <Card actions={[< DeleteOutlined key="delete" />]}>
                            <Card.Meta description={item.id} />
                        </Card>
                    </List.Item>
                )
            }}
        >
        </List >
    );
}

FollowList.protoType = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
}

export default FollowList;