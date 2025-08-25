

type UserProfile = {
  name: string;
  email: string;
  initials: string;
};

type UserMenuProps = {
  userProfile: UserProfile;
};

export function UserMenu({ userProfile }: UserMenuProps) {
  return (
    <footer className="flex gap-3 px-4 py-5 mb-5 w-full border-t border-gray-200 items-center">
        <div
          className="w-8 h-8 bg-blue-dark rounded-full flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-sm text-gray-600 font-normal">
            {userProfile.initials}
          </span>
        </div>

        <div className="flex flex-col flex-1">
          <span className="text-sm font-normal text-gray-600">
            {userProfile.name}
          </span>

          <span className="text-xs font-normal text-gray-400 truncate">
            {userProfile.email}
          </span>
        </div>
      </footer>
  )
}
