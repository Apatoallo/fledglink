import React, { Component } from 'react';
import ConnectionDialog from './connectionDialog';

// TODO: Remove. Not removed because of changing customers mind previously
export default function withConnectionDialog(ParentComponent) {
    return class WithConnectionDialog extends Component {
        static navigationOptions = {
            header: null,
        };

        constructor(props) {
            super(props);
            this.state = {
                showModal: false,
                selectedItems: [],
                dropdownSelected: '',
                disabledButton: true,
                dropdownSelectedAcquaintance: '',
                user: {},
            };
        }

        onSelectedChange = (selectedItems) => {
            if (selectedItems.length > 5) return;
            const disableButton = selectedItems.length <= 4 || !this.state.dropdownSelected.length;
            this.setState({
                selectedItems,
                disabledButton: disableButton,
            });
        };

        toggleModal = (user) => {
            const { showModal } = this.state;
            this.setState({
                showModal: !showModal,
                user,
            });
        };

        onChangeDropdown = (value) => {
            if (value === 'I dont know you but...') this.state.selectedItems = [];
            const disableButton = !this.state.selectedItems.length || !value.length;
            this.setState({
                dropdownSelected: value,
                disabledButton: disableButton,
                dropdownSelectedAcquaintance: '',
            });
        };

        onChangeDropdownAcquaintance = (value) => {
            const disableButton = !this.state.dropdownSelected.length;
            this.setState({
                dropdownSelectedAcquaintance: value,
                selectedItems: [],
                disabledButton: disableButton,
            });
        };

        sendRequest = () => {
            const {
                token, fetchAcceptRequestAction, connectionStatus, fetchSendRequestAction,
            } = this.props;
            const {
                user, dropdownSelected, dropdownSelectedAcquaintance, selectedItems,
            } = this.state;
            if (connectionStatus && connectionStatus === 'receiver') {
                fetchAcceptRequestAction(token, user.id, dropdownSelected, selectedItems, dropdownSelectedAcquaintance);
            } else {
                fetchSendRequestAction(token, user.id, dropdownSelected, selectedItems, dropdownSelectedAcquaintance);
            }
            this.setState({
                selectedItems: [],
                dropdownSelected: '',
                showModal: false,
            });
        };

        render() {
            const {
                loadOptions,
                userOptions,
                userOptions: { iKnowYou, iDontKnowYou, qualities },
            } = this.props;
            const {
                user,
                dropdownSelected,
                dropdownSelectedAcquaintance,
                selectedItems,
                showModal,
                disabledButton,
            } = this.state;
            return (
                <ParentComponent {...this.props} toggleModal={this.toggleModal}>
                    <ConnectionDialog
                        dataLength={Object.keys(userOptions).length}
                        sendRequest={this.sendRequest}
                        fullName={user.fullName || 'this user'}
                        selectedItems={selectedItems}
                        showModal={showModal}
                        dropdownSelected={dropdownSelected}
                        loadOptions={loadOptions}
                        iKnowYou={iKnowYou}
                        qualities={qualities}
                        onChangeDropdown={this.onChangeDropdown}
                        onSelectedChange={this.onSelectedChange}
                        toggleModal={this.toggleModal}
                        disabledButton={disabledButton}
                        iDontKnowYou={iDontKnowYou}
                        onChangeDropdownAcquaintance={
                            this.onChangeDropdownAcquaintance
                        }
                        dropdownSelectedAcquaintance={
                            dropdownSelectedAcquaintance
                        }
                    />
                </ParentComponent>
            );
        }
    };
}
