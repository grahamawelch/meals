import AddMealForm from './components/AddMealForm';
import RecentMeals from './components/RecentMeals';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 mb-8">
          Meals
        </h1>
        <div className="w-full space-y-12">
          <RecentMeals />
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
              Add a New Meal
            </h2>
            <AddMealForm />
          </div>
        </div>
      </main>
    </div>
  );
}
