import * as React from "react";

export const Hierarchy = (props: {
	hierarchies: string[];
	children: string[];
}) => {
	const [isExpanded, setIsExpanded] = React.useState(true);

	const computeBasePath = (hierarchies: string[]) => {
		return hierarchies.reduce((acc, curr, index) => {
			return index === 0 ? curr : `${acc}/${curr}`;
		}, "");
	};

	return props.hierarchies.length > 0 ? (
		<div className="hierarchy-wrapper">
			<div className="nav-header"></div>
			<div
				className={`hierarchy-title-outer ${isExpanded ? "hierarchy-expanded" : "hierarchy-collapsed"}`}
			>
				<div
					className="hierarchy-title"
					onClick={() => setIsExpanded((val) => !val)}
				>
					Hierarchy
				</div>
			</div>
			<div
				className={`hierarchy-link-list ${isExpanded ? "hierarchy-list-expanded" : "hierarchy-list-collapsed"}`}
			>
				{props.hierarchies.map((_, index) => {
					if (index === props.hierarchies.length - 1) {
						return null;
					}
					const basePath = computeBasePath(
						props.hierarchies.slice(0, index + 1),
					);
					return (
						<HierarchyItem
							key={basePath}
							path={basePath}
						></HierarchyItem>
					);
				})}
				{props.children.map((childPath) => {
					return (
						<HierarchyItem
							key={childPath}
							path={childPath}
						></HierarchyItem>
					);
				})}
			</div>
		</div>
	) : (
		<></>
	);
};

const HierarchyItem = (props: { path: string }) => {
	return (
		<div key={props.path}>
			[[
			<span className="cm-hmd-internal-link cm-list-1">
				<a href={`obsidian://new?file=${props.path}.md&append=true`}>
					{props.path}
				</a>
			</span>
			]]
		</div>
	);
};
