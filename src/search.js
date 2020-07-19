import React from 'react';
import ajax from './ajax'
import 'antd/dist/antd.css'

import './search.css'
import { Select, List, Icon, Tag } from 'antd';
const { Option } = Select
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

export default class Search extends React.Component {
    state = {
        value: undefined,
        keyData: [],
        visible: true,
        listData: []
    }
    componentWillMount () {
        
    }
    handleChange = (value) => {
        this.setState({value})
        ajax(`https://i.snssdk.com/search/api/study/?keyword=${value}`, 'get', data => {
            this.setState({listData: data.data})
        })
    }
    handleSearch = (value) => {
        this.setState({value: value})
        if (value === '新兵训练营') {
            setTimeout(() => {
                document.querySelector('.animated').className = 'animated hidden'
            }, 2000)
        }
        ajax(`https://i.snssdk.com/search/api/sug/?keyword=${value}`, 'get', data => {
            this.setState({keyData: data.data})
        })
    }
    changeVisible = () => {
        this.setState({visible: false})
    }
    render () {
        const options = this.state.keyData && this.state.keyData.map(d => <Option key={d.keyword}>{d.keyword}</Option>);
        return <div className={'search'}>
            <Select
                    showSearch
                    value={this.state.value}
                    placeholder={'请输入'}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={this.handleSearch}
                    onChange={this.handleChange}
                    notFoundContent={null}
                >
                    {options}
                </Select>
                {this.state.value==='新兵训练营' && <div className="animated shake modal" onClick={this.changeVisible}><span className="show">欢迎</span></div>}
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={this.state.listData.length > 5 && {
                    pageSize: 5,
                    }}
                    dataSource={this.state.listData}
                    renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                        <IconText type="user" text={item.user_name} key="list-vertical-like-o" />,
                        <IconText type="message" text={item.comments_count} key="list-vertical-message" />,
                        ]}
                    >
                        <List.Item.Meta
                        title={<a href={item.link_url} target='_blank'>{item.title}</a>}
                        description={item.description}
                        />
                        {
                            item.tags.map(item => {
                                return <Tag color="magenta">{item}</Tag>
                            })
                        }
                    </List.Item>
                    )}
                />
        </div>
                  
    }
} 