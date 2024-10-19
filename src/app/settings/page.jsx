import userData from './settingsInfo.json'
import UserCardWrapper from '@/components/User/UserCardWrapper';
import SavedSearchList from '@/components/User/SavedSearchList';
export default function Page() {
  return (
    <>
    <div>Settings page</div>
    <UserCardWrapper user={userData.user} />
    <br/>
    <SavedSearchList savedSearches={userData.user.savedSearches} />

    </>
  );
}