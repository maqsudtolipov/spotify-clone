import UserDropdown from './UserDropdown.tsx';

const UserActions = () => {
  // TODO: notifications and login button is hidden

  return (
    <div className="flex items-center gap-4">
      {/*<Button>Login</Button>*/}
      {/*<NavTooltip*/}
      {/*  trigger={*/}
      {/*    <NavButton*/}
      {/*      isTransparent={true}*/}
      {/*      isSmall={true}*/}
      {/*      icon={<RiNotification3Line />}*/}
      {/*    />*/}
      {/*  }*/}
      {/*  position="bottom"*/}
      {/*  content="Whats New"*/}
      {/*/>*/}
      <UserDropdown />
    </div>
  );
};

export default UserActions;
