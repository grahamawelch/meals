import { addMeal, getRecentMeals } from '@/app/actions/meals';

export default async function Home() {
  const meals = await getRecentMeals(5);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 mb-8">
          Meals
        </h1>

        <section className="w-full mb-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
            Recent Meals
          </h2>
          {meals.length === 0 ? (
            <p className="text-zinc-600 dark:text-zinc-400">No meals added yet.</p>
          ) : (
            <div className="space-y-3">
              {meals.map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
                >
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium">{meal.name}</span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {new Date(meal.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="w-full">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Add a New Meal</h2>
          <form action={addMeal} className="w-full max-w-md mx-auto space-y-4">
            <div>
              <label htmlFor="mealName" className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                Meal Name
              </label>
              <input
                id="mealName"
                name="name"
                type="text"
                placeholder="Enter meal name..."
                className="w-full px-4 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black"
            >
              Add Meal
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
