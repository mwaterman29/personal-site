import { Essay } from "@prisma/client";
import EssayListItem from "./EssayListItem";
import Keep from '@material-symbols/svg-400/outlined/keep.svg';

const EssaysPanel = ({essays}: {essays: Essay[]}) => 
{
    const pinnedEssays = essays.filter(essay => essay.pinned);
    const otherEssays = essays.filter(essay => !essay.pinned).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return (
        <div className="flex flex-col w-full">
            {/* Pinned Essays Section */}
            {pinnedEssays.length > 0 && (
                <div className="mb-8">
                    <h2 className="flex flex-row items-center gap-2 text-2xl pb-4">
                        <span className="text-[32px] -rotate-45"><Keep/></span>               
                        Pinned Essays
                    </h2>
                    <div className="flex flex-col">
                        {pinnedEssays.map((essay, index) => (
                            <EssayListItem essay={essay} key={`pinned-${essay.id}`} />
                        ))}
                    </div>
                </div>
            )}

            {/* All Essays Section */}
            <div>
                <h2 className="text-2xl pb-4">All Essays</h2>
                <div className="flex flex-col">
                    {otherEssays.map((essay, index) => (
                        <EssayListItem essay={essay} key={`essay-${essay.id}`} />
                    ))}
                </div>
            </div>

            {/* Empty state if no essays */}
            {essays.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-neutral-400">
                    <p className="text-xl">No essays yet</p>
                    <p className="text-sm">Check back soon for new content!</p>
                </div>
            )}
        </div>
    );
};

export default EssaysPanel;