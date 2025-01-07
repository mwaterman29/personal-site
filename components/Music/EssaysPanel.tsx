import { Essay } from "@prisma/client";
import EssayCard from "./EssayCard";
import Keep from '@material-symbols/svg-400/outlined/keep.svg';
import Timer from '@material-symbols/svg-400/outlined/timer.svg';
import Edit from '@material-symbols/svg-400/outlined/edit.svg';

const EssaysPanel = ({essays}: {essays: Essay[]}) => 
{
    const pinnedEssays = essays.filter(essay => essay.pinned);
    const otherEssays = essays.filter(essay => !essay.pinned);

    return (
        <div>
            <h1 className="flex flex-row items-center gap-2 text-2xl pt-2">
                <span className="text-[40px] -rotate-45"><Keep/></span>               
                Pinned Essays
            </h1>
            <hr className="my-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-2 gap-2">
                {pinnedEssays.map((essay, index) => {
                    return (
                        <EssayCard essay={essay} key={index}/>
                    )
                })}
                {Array.from({length: 3 - (pinnedEssays.length % 3)}, (_, i) => (
                    <div key={i} className="border border-dashed h-full w-full rounded-md p-2 items-center justify-center flex">
                        <p className="flex flex-row items-center gap-2 text-xl font-semibold text-neutral-400">
                            <span className="hidden scale-x-[-1] text-[28px]"><Edit/></span>
                            <span className="text-[28px]"><Timer/></span>
                            Coming soon!
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EssaysPanel;