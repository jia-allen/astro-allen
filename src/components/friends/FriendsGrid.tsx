import { ErrorBoundary, ErrorFallback } from '@components/common';
import { LazyMotionProvider } from '@components/common/LazyMotionProvider';
import { microDampingPreset } from '@constants/anim/spring';
import { friendsData } from '@constants/friends-config';
import { useTranslation } from '@hooks/useTranslation';
import { m } from 'motion/react';
import FriendCard from './FriendCard';

export default function FriendsGrid() {
  const { t } = useTranslation();

  return (
    <LazyMotionProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="w-full">
          {/* Grid Container */}
          <div className="grid grid-cols-3 gap-6 md:grid-cols-2 md:gap-4 xl:grid-cols-4 xl:gap-8">
            {friendsData.map((friend, index) => (
              <FriendCard key={friend.url} friend={friend} index={index} />
            ))}
          </div>

          {/* Empty State */}
          {friendsData.length === 0 && (
            <m.div
              className="flex min-h-[300px] flex-col items-center justify-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...microDampingPreset }}
            >
              <h3 className="mb-2 font-bold text-3xl text-gray-700 dark:text-gray-300">{t('friends.emptyTitle')}</h3>
              <p className="text-gray-500 text-lg dark:text-gray-400">{t('friends.emptyDesc')}</p>
            </m.div>
          )}
        </div>
      </ErrorBoundary>
    </LazyMotionProvider>
  );
}
