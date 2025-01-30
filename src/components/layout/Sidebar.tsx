import Link from 'next/link';
import { 
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: ChartPieIcon },
  { name: 'Accounts', href: '/accounts', icon: UserGroupIcon },
  { name: 'Templates', href: '/templates', icon: DocumentTextIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Chat', href: '/chat', icon: ChatBubbleLeftRightIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col w-16 bg-white border-r border-gray-200 h-screen fixed left-0 top-0">
      <div className="flex-1 flex flex-col pt-4 pb-4 overflow-y-auto">
        <div className="flex-shrink-0 flex items-center justify-center mb-4">
          <img
            className="h-8 w-auto"
            src="/logo.svg"
            alt="Buraq"
          />
        </div>
        <nav className="flex-1 space-y-2 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-blue-600"
            >
              <item.icon
                className="h-6 w-6"
                aria-hidden="true"
              />
              <span className="sr-only">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
